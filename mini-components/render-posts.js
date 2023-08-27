import { posts } from "../index.js";

export function renderPosts () {
    const postsContainer = posts.map(post => {
        const {id, imageUrl, createdAt, description, likes, isLiked} = post;
        const {user} = post;
        const lenLikes = likes.length;
        return `<li class="post">
          <div class="post-header" data-user-id="${user.id}">
              <img src="${user.imageUrl}" class="post-header__user-image">
              <p class="post-header__user-name">${user.name}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${imageUrl}">
          </div>
          <div class="post-likes">
            <button data-post-id="${id}" class="like-button">
              <img src="${isLiked ?'./assets/images/like-active.svg':'./assets/images/like-not-active.svg'}">
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${lenLikes === 0? 0 : `${likes.at(-1).name}${lenLikes > 1? `и еще ${lenLikes - 1}`: ''}` }</strong>
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