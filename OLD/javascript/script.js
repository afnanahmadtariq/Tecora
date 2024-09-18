// Voting Logic
document.querySelectorAll('.upvote').forEach(button => {
    button.addEventListener('click', function() {
        let voteCount = this.nextElementSibling;
        voteCount.innerText = parseInt(voteCount.innerText) + 1;
    });
});

document.querySelectorAll('.downvote').forEach(button => {
    button.addEventListener('click', function() {
        let voteCount = this.previousElementSibling;
        voteCount.innerText = parseInt(voteCount.innerText) - 1;
    });
});
