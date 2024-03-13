let userParent = document.getElementById('users');

// Get All Users Using XMLHttpRequest
/*
const getUsers = () => {
  const req = new XMLHttpRequest();
  req.open('GET', "https://jsonplaceholder.typicode.com/users");
  req.responseType = 'json';
  req.send();

  req.onload = function () {
    if (req.status >= 200 && req.status < 300) {
      req.response.forEach(user => {
        let userElement = document.createElement('div');
        userElement.className = 'user';
        userElement.innerHTML = `<h3>${user.name}</h3>
        <p>${user.email}</p>
        `
        userElement.addEventListener('click', function () {
          addActive(this);
          getUserPosts(user.id);
        })

        userParent.appendChild(userElement);
      })
      userParent.firstElementChild.classList.add('active');
    }
  }
}
*/

// Get All Users Using fetch
const getUsers = () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      console.log('inside first then');
      return response.json()
    })
    .then((data) => {
      console.log('inside second then');
      data.forEach(user => {
        let userElement = document.createElement('div');
        userElement.className = 'user';
        userElement.innerHTML = `<h3>${user.name}</h3>
          <p>${user.email}</p>
          `
        userElement.addEventListener('click', function () {
          addActive(this);
          getUserPosts(user.id);
        })

        userParent.appendChild(userElement);
      })
      userParent.firstElementChild.classList.add('active');
      // getFirstUserPosts();
    })
    .catch((err) => {
      console.log(err);
      console.log('Something went wrong');
    })
}
getUsers();


// Add Active Class
const addActive = (clickedUser) => {
  let allUsers = Array.from(document.getElementsByClassName('user'));

  allUsers.forEach(user => user.classList.remove('active'));
  clickedUser.classList.add('active');

}

// Get User Posts by User Id
const getUserPosts = (userId) => {

  const req = new XMLHttpRequest();
  req.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  req.responseType = 'json';
  req.send();

  req.onload = function () {
    if (req.status >= 200 && req.status < 300) {
      let postParent = document.getElementById('posts');
      const postsData = req.response;

      postParent.innerHTML = '';
      postsData.forEach(post => {
        const postEle = document.createElement('div');
        postEle.className = 'post';
        postEle.innerHTML = `<h5 class="title">${post.title}</h5>
      <p>${post.body}</p>`;

        postParent.appendChild(postEle);
      })

    }
  }

}

// Get All Posts
const getFirstUserPosts = () => {
  let postParent = document.getElementById('posts');
  const req = new XMLHttpRequest();
  req.open('GET', 'https://jsonplaceholder.typicode.com/posts?userId=1');
  req.responseType = 'json';
  req.send();

  req.onload = function () {
    if (req.status >= 200 && req.status < 300) {
      req.response.forEach(post => {
        let postData = `
        <div class="post">
          <h5 class="title">${post.title}</h5>
          <p>${post.body}</p>
        </div>
        `;
        postParent.innerHTML += postData;
      });
    }
  }
}
// getFirstUserPosts();
// test