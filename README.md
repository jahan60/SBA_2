### Learner Data Summary

1. What Data I Have
I have three sets of data:

# Course Info – general information about the course.
# Assignment Group (ag) – a list of assignments with:
# Assignment ID - Points possible, Due date
# Learner Submissions – a list of submissions from learners with: Learner ID, Assignment ID, Submission date, Score

2. What I Can Infer From the Data
# From this data, I can calculate:
---Which assignments are done on time or late.
---Learner’s score for each assignment.
---Learner’s total score and total possible points.
---Learner’s average score (total score ÷ total possible points).
---I can also skip assignments that are not needed (like assignment 3 in this case) and apply late penalties if needed.
---The final output is a list of learners with:
---id – learner’s ID
---avg – average score (number between 0 and 1)
---Assignment scores – the score for each assignment (normalized between 0 and 1)

3. How I Did It
# I mapped assignments by ID for easy lookup.
# I looped through each submission:
# Skipped assignment 3
# Checked if the submission was late
# Applied a 10% penalty for late submissions
# Added the score to the learner’s total
# Stored normalized scores (score ÷ points possible)
# I calculated each learner’s average by dividing total score by total points.
# I built the final list containing learner ID, average, and assignment scores.
