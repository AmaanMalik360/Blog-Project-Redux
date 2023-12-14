let blogCollection = [
    {
        "author": "The MongoDB Atlas Team",
        "id": "62247ec8",
        "title": "Introducing Vector Search in GA",
        "body": "Exciting news! Atlas Vector Search is now available in GA. Vector Search allows you to build intelligent applications powered by semantic search and generative AI over any type of data. Within five months of its release, Atlas Vector Search has earned the highest developer NPS in Retool's State of AI 2023 survey, as highlighted in our recent blog post.",
        "userId": "713a921f"
    },
    {
        "author": "Abu Sufyan",
        "id": "f6f360bf",
        "title": "Freelancing by Upwork",
        "body": "Hi,\nWe noticed you have not been working through Upwork lately.\nTo improve clients' search results, and show them more freelancers who are available, we have changed your profile to \"private\" until you are ready to start taking on new jobs.\nThe next time you log into Upwork, your profile will again become public.",
        "userId": "713a921f"
    },
    {
        "author": "Patrick Bet David",
        "id": "285db6d2",
        "title": "My New Book 'Choose Your Enemies Wisely' ",
        "body": "Today is the official publication of Choose Your Enemies Wisely. My publisher (Penguin Portfolio) has already had to reprint based on all the pre-orders!\n\nYou know what I love most about writing books? Hearing about the IMPACT it makes on readers like you.\n\nI’ve delivered a Business Planning workshop the past two years, and I love hearing stories about how this content helped people:\n\n \nGain total clarity on their vision, mission, and strategic plan.\nIdentify their enemies and leverage them for rocket fuel to inspire themselves and their team.\nFind the balance of logic and emotion—you’ll see that people first need to be moved (the why) before you can lead them (the how).",
        "userId": "c8bfc94b"
    },
    {
        "author": "Talha",
        "id": "d5bc526f",
        "title": "Why I Prefer Regular Merge Commits Over Squash Commits",
        "body": "As a refresher, the difference between a “squash commit” and a “merge commit” is that a regular “merge” includes all of the Git commits in the history of the target branch, while “squash” flattens them to one commit.\n\nConfusingly, “squash” isn’t its own command. Instead, you can choose “squash and merge” or “squash and rebase” as an option when you’re running the git merge or git rebase commands, respectively.\n\nBy default, a pull request (PR) will be a merge commit, so after the PR is merged then the entire history of the working branch will be merged in, plus an additional commit (“Merge pull request #21 from branch…”).\n\nOn the other hand, you can set your repository to “squash and merge” by default, meaning merged PRs will result in only a single commit each, instead of bringing over all the commits from the working branch.",
        "userId": "c8bfc94b"
    },
  ];
  
  export default blogCollection;
  