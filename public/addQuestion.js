document.addEventListener('DOMContentLoaded', function() {
    const addQuestionForm = document.getElementById('addQuestionForm');

    addQuestionForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const quizId = document.getElementById('quizId').value; // Get quizId from an input field

        const questionText = document.getElementById('questionText').value;
        const optionA = document.getElementById('optionA').value;
        const optionB = document.getElementById('optionB').value;
        const optionC = document.getElementById('optionC').value;
        const optionD = document.getElementById('optionD').value;
        const correctAnswer = document.getElementById('correctAnswer').value;

        fetch('/addQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quizId, questionText, optionA, optionB, optionC, optionD, correctAnswer })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error adding question.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Question added successfully!');
            window.location.href = `/addQuestion/${quizId}`;
        })
        .catch(error => {
            console.error(error);
        });
    });
});
