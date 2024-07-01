document.addEventListener('DOMContentLoaded', function() {
    const createQuizForm = document.getElementById('createQuizForm');

    createQuizForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const quizTitle = document.getElementById('quizTitle').value;
        const quizSubject = document.getElementById('quizSubject').value;

        fetch('/createQuiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quizTitle, quizSubject })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error creating quiz.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Quiz created successfully!');
            window.location.href = `/addQuestion/${data.insertId}`;
        })
        .catch(error => {
            console.error(error);
            alert('An error occurred while creating the quiz.');
        });
    });
});
