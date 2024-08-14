document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts-container');

    // Fetch all posts from the API
    fetch('https://api.stein.shn.hk/api/posts')
        .then(response => response.json())
        .then(data => {
            // Filter posts by type "note"
            const notePosts = data.filter(post => post.type === 'note');

            // Sort posts from new to old
            notePosts.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Display each post on the page
            notePosts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');

                const postDate = new Date(post.date).toLocaleString();
                postElement.innerHTML = `
                    <h2>${post.text}</h2>
                    <p><strong>User:</strong> ${post.user}</p>
                    <p><strong>Date:</strong> ${postDate}</p>
                    <hr>
                `;

                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
});