import { userPosts } from "../index.js";

export function renderUserPosts () {
    console.log(userPosts);
    const postsContainer = userPosts.map(userPost => {
        if(userPost === undefined){
            return;
        }
        const {id, imageUrl, createdAt, description, likes, isLiked} = userPost;
        const {user} = userPost;
  
        return `<li class="post">
          <div class="post-image-container">
            <img class="post-image" src="${imageUrl}">
          </div>
          <div class="post-likes">
            <button data-post-id="${id}" class="like-button">
              <img src="${isLiked ?'./assets/images/like-active.svg':'./assets/images/like-not-active.svg'}">
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${likes.length}</strong>
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${user.name}</span>
            ${description}
          </p>
          <p class="post-date">
          ${new Date(createdAt)}
            <!--19 минут назад-->
          </p>
        </li>`
    })
    return postsContainer.join("").replace(',','');
}