import { startOfWeek, endOfWeek, subDays, startOfMonth, endOfMonth, subMonths } from 'date-fns';

// Function to filter data
const filterData = (historicalData, searchQuery, dateFilter, startDate, endDate) => {
  const startDateWeek = startOfWeek(new Date());
  const endDateWeek = endOfWeek(new Date());

  return historicalData.filter(session => {
    const sessionDate = new Date(session.SessionDate);

    let withinDateRange = true;
    if (dateFilter === 'this_week') {
      withinDateRange = sessionDate >= startDateWeek && sessionDate <= endDateWeek;
    } else if (dateFilter === 'last_week') {
      const start = subDays(startDateWeek, 7);
      const end = subDays(endDateWeek, 7);
      withinDateRange = sessionDate >= start && sessionDate <= end;
    } else if (dateFilter === 'last_month') {
      const start = startOfMonth(subMonths(new Date(), 1));
      const end = endOfMonth(subMonths(new Date(), 1));
      withinDateRange = sessionDate >= start && sessionDate <= end;
    } else if (dateFilter === 'custom_range') {
      withinDateRange = sessionDate >= new Date(startDate) && sessionDate <= new Date(endDate);
    }

    const queryLowerCase = searchQuery.toLowerCase();

    // Check if any EventDetails match the query
    const matchesEventDetails = session.EventDetails.some(eventDetail => {
      return (
        (eventDetail.grass && 'grass'.includes(queryLowerCase)) ||
        (eventDetail.spikes && 'spikes'.includes(queryLowerCase)) ||
        (eventDetail.sled && 'sled'.includes(queryLowerCase))
      );
    });

    // Check if any part of the session matches the query
    const matchesQuery = session.SessionType.toLowerCase().includes(queryLowerCase) ||
                          session.Notes.toLowerCase().includes(queryLowerCase) ||
                          matchesEventDetails ||
                          session.EventDetails.some(eventDetail => 
                            typeof eventDetail.Event === 'string' && eventDetail.Event.toLowerCase().includes(queryLowerCase)
                          );

    return withinDateRange && matchesQuery;
  });
};

export default filterData;
