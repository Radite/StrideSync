// calculateSummary.js

export const calculateSummary = (filteredData) => {
  const summaries = {
    Running: { totalDistance: 0, totalDuration: 0, totalSessions: 0 },
    Jump: {
      HighJump: { totalDistance: 0, totalJumps: 0, averageJump: 0 },
      LongJump: { totalDistance: 0, totalJumps: 0, averageJump: 0 },
      PoleVault: { totalDistance: 0, totalJumps: 0, averageJump: 0 },
      TripleJump: { totalDistance: 0, totalJumps: 0, averageJump: 0 }
    },
    Throw: {
      ShotPut: { totalDistance: 0, totalThrows: 0, averageThrow: 0 },
      Discus: { totalDistance: 0, totalThrows: 0, averageThrow: 0 },
      Javelin: { totalDistance: 0, totalThrows: 0, averageThrow: 0 },
      HammerThrow: { totalDistance: 0, totalThrows: 0, averageThrow: 0 }
    }
  };

  filteredData.forEach(session => {
    const { TotalDistanceRan, TotalTimeRan, TotalDistanceHighJumped, TotalDistanceLongJumped, TotalDistancePoleVaulted, TotalDistanceTripleJumped, TotalDistanceShotPut, TotalDistanceDiscusThrown, TotalDistanceJavelinThrown, TotalDistanceHammerThrown, NumberOfHighJumps, NumberOfLongJumps, NumberOfPoleVaults, NumberOfTripleJumps, NumberOfShotPuts, NumberOfDiscusThrows, NumberOfJavelinThrows, NumberOfHammerThrows } = session;

    if (TotalDistanceRan) {
      summaries.Running.totalDistance += TotalDistanceRan;
      summaries.Running.totalDuration += TotalTimeRan;
      summaries.Running.totalSessions += 1;
    }
    if (TotalDistanceHighJumped) {
      summaries.Jump.HighJump.totalDistance += TotalDistanceHighJumped;
      summaries.Jump.HighJump.totalJumps += NumberOfHighJumps;
    }
    if (TotalDistanceLongJumped) {
      summaries.Jump.LongJump.totalDistance += TotalDistanceLongJumped;
      summaries.Jump.LongJump.totalJumps += NumberOfLongJumps;
    }
    if (TotalDistancePoleVaulted) {
      summaries.Jump.PoleVault.totalDistance += TotalDistancePoleVaulted;
      summaries.Jump.PoleVault.totalJumps += NumberOfPoleVaults;
    }
    if (TotalDistanceTripleJumped) {
      summaries.Jump.TripleJump.totalDistance += TotalDistanceTripleJumped;
      summaries.Jump.TripleJump.totalJumps += NumberOfTripleJumps;
    }
    if (TotalDistanceShotPut) {
      summaries.Throw.ShotPut.totalDistance += TotalDistanceShotPut;
      summaries.Throw.ShotPut.totalThrows += NumberOfShotPuts;
    }
    if (TotalDistanceDiscusThrown) {
      summaries.Throw.Discus.totalDistance += TotalDistanceDiscusThrown;
      summaries.Throw.Discus.totalThrows += NumberOfDiscusThrows;
    }
    if (TotalDistanceJavelinThrown) {
      summaries.Throw.Javelin.totalDistance += TotalDistanceJavelinThrown;
      summaries.Throw.Javelin.totalThrows += NumberOfJavelinThrows;
    }
    if (TotalDistanceHammerThrown) {
      summaries.Throw.HammerThrow.totalDistance += TotalDistanceHammerThrown;
      summaries.Throw.HammerThrow.totalThrows += NumberOfHammerThrows;
    }
  });

  // Calculate averages
  Object.keys(summaries.Jump).forEach(key => {
    const jump = summaries.Jump[key];
    jump.averageJump = jump.totalJumps > 0 ? (jump.totalDistance / jump.totalJumps).toFixed(2) : 0;
  });

  Object.keys(summaries.Throw).forEach(key => {
    const throwEvent = summaries.Throw[key];
    throwEvent.averageThrow = throwEvent.totalThrows > 0 ? (throwEvent.totalDistance / throwEvent.totalThrows).toFixed(2) : 0;
  });

  // Average Avg Speed for running
  const averageSpeed = summaries.Running.totalSessions > 0
    ? (summaries.Running.totalDistance / summaries.Running.totalDuration).toFixed(2)
    : 0;

  return {
    Running: {
      totalDistance: summaries.Running.totalDistance.toFixed(2),
      totalDuration: summaries.Running.totalDuration.toFixed(2),
      averageSpeed
    },
    Jump: summaries.Jump,
    Throw: summaries.Throw
  };
};
