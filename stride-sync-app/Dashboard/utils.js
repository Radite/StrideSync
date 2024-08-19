export const calculateFieldEventStats = (distances, eventCounts) => {
  return {
    highJump: {
      total: distances.totalDistanceHighJumped,
      average: eventCounts.totalHighJumps > 0
        ? (distances.totalDistanceHighJumped / eventCounts.totalHighJumps).toFixed(2)
        : 0
    },
    longJump: {
      total: distances.totalDistanceLongJumped,
      average: eventCounts.totalLongJumps > 0
        ? (distances.totalDistanceLongJumped / eventCounts.totalLongJumps).toFixed(2)
        : 0
    },
    poleVault: {
      total: distances.totalDistancePoleVaulted,
      average: eventCounts.totalPoleVaults > 0
        ? (distances.totalDistancePoleVaulted / eventCounts.totalPoleVaults).toFixed(2)
        : 0
    },
    shotPut: {
      total: distances.totalDistanceShotPut,
      average: eventCounts.totalShotPuts > 0
        ? (distances.totalDistanceShotPut / eventCounts.totalShotPuts).toFixed(2)
        : 0
    },
    discus: {
      total: distances.totalDistanceDiscusThrown,
      average: eventCounts.totalDiscusThrows > 0
        ? (distances.totalDistanceDiscusThrown / eventCounts.totalDiscusThrows).toFixed(2)
        : 0
    },
    javelin: {
      total: distances.totalDistanceJavelinThrown,
      average: eventCounts.totalJavelinThrows > 0
        ? (distances.totalDistanceJavelinThrown / eventCounts.totalJavelinThrows).toFixed(2)
        : 0
    },
    hammerThrow: {
      total: distances.totalDistanceHammerThrown,
      average: eventCounts.totalHammerThrows > 0
        ? (distances.totalDistanceHammerThrown / eventCounts.totalHammerThrows).toFixed(2)
        : 0
    }
  };
};

export const processWeeklyData = (sessions) => {
  const weekData = Array(7).fill(0);
  const sessionCounts = Array(7).fill(0);

  sessions.forEach(session => {
    const dayIndex = moment(session.SessionDate).day(); // 0 = Sunday, 6 = Saturday
    weekData[dayIndex] += session.IntensityPercentage;
    sessionCounts[dayIndex] += 1;
  });

  return weekData.map((totalIntensity, index) => {
    return sessionCounts[index] > 0 ? (totalIntensity / sessionCounts[index]).toFixed(2) : 0;
  });
};
