# High-level user flow

- Initially we show a StartScreen when status is idle.
- User clicks start quiz, we set status to loading and fetch Questions.
- When we load all questions we will set status to loaded, then we will show question, options and next btn.
- We will also show numbered list of all questions, when user clicks that number we change the current question so that user can navigate to previous questions.
- Based on question at current index we will show question and options.
- We will also save answers selected by user so that we can prevent user from changing their selection.
- We will change styles of btn based on user selection.
- We will disable next btn till user has selected answer to displayed question.
- When user clicks next btn, we will show next question and cycle repeats till all questions are answered.

- App
  - idle ? StartScreen
  - loading ? LoadingScreen
  - Error ? ErrorScreen
  - loaded ? Question (at current index)
