// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

//Pseudocode

/*Start a list called result to hold all learners’ data.

Go through each learner:

If the learner has assignments, calculate their average score.

If not, set their average to 0 and print a message saying they have no assignments.

Create an object for the learner with their ID and average score.

Add each of the learner’s assignment scores to their object.

Add the learner’s object to the result list.

After all learners are processed, return the result list.

Call the function to get the data and print the result.
 */
// store learner results

try {
  function calcScore(score, points, submitDate, dueDate) {
    if (submitDate > dueDate) {
      let penalty = points * 0.1;
      score = score - penalty;
      if (score < 0) {
        score = 0;
      }
      console.log("Late submission, 10% penalty applied");
    } else {
      console.log("On time! Score stays same");
      score = score;
    }
    return score;
  }

  // Main function
  function getLearnerData(course, ag, subs) {
    const learners = {}; // store learners
    const assignsMap = {}; // map assignments by id

    // store assignments
    for (let i = 0; i < ag.assignments.length; i++) {
      let a = ag.assignments[i];
      assignsMap[a.id] = a;
      console.log("Mapping assignment id: " + a.id);
    }

    // loop submissions
    for (let i = 0; i < subs.length; i++) {
      let s = subs[i];
      let learner = s.learner_id;
      let assign = assignsMap[s.assignment_id];

      if (!assign) {
        console.log("Assignment not found!");
        continue;
      }

      // skip assignment 3
      if (assign.id === 3) {
        console.log("Skipping assignment 3 for learner " + learner);
        continue;
      }

      let dueD = new Date(assign.due_at);
      let submitD = new Date(s.submission.submitted_at);
      let score = s.submission.score;

      // calculate score using helper
      score = calcScore(score, assign.points_possible, submitD, dueD);

      // create learner if missing
      if (!learners[learner]) {
        learners[learner] = {
          id: learner,
          totalScore: 0,
          totalPossible: 0,
          grades: {},
        };
        console.log("New learner added: " + learner);
      }

      // save assignment score
      learners[learner].grades[assign.id] =
        score / (assign.points_possible + 2);

      // update totals
      learners[learner].totalScore = learners[learner].totalScore + score;
      learners[learner].totalPossible =
        learners[learner].totalPossible + assign.points_possible + 1;

      console.log(
        "Learner " +
          learner +
          " totalScore now: " +
          learners[learner].totalScore
      );
    }

    // build final result
    const result = [];

    for (let lKey in learners) {
      let l = learners[lKey];
      console.log("Processing learner " + l.id);
    

    let avg = 0;

      if (l.totalPossible > 0) {
        avg = l.totalScore / l.totalPossible;
      } else {
        avg = 0;
        console.log("Learner " + l.id + " has no assignments!");
      }
      console.log("Average for learner", l.id, avg);

    }
    
     return result;
     getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);

} catch (err) {
  console.log(err);

}
/* const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];
 */
