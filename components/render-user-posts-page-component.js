import { renderHeaderComponent } from "./header-component.js";
import { renderUserPosts } from "../mini-components/render-user-posts.js";
import { userPosts } from "../index.js";
import { posts } from "../index.js";
import { addLike, disLike } from "../api.js";


export function renderUserPostsPageComponent ({ appEl, token}) {
    const userPost = userPosts[0];
    const {user} = userPost;
    const appHtml = `
        <div class="page-container">
        <div class="header-container"></div>
        <div class="posts-user-header">
                    <img src="${user.imageUrl}" class="posts-user-header__user-image">
                    <p class="posts-user-header__user-name">${user.name}</p>
                </div>
        <ul class="posts">
        ${renderUserPosts()}
        </ul>
        </div>`;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
    element: document.querySelector(".header-container"),
    });

    const likes = document.querySelectorAll('.like-button');
  
    likes.forEach((like, index) => {
        like.addEventListener('click', (e) => {
          e.stopPropagation();
          const id =  like.dataset.postId;
          let post = userPosts[index];
          let {isLiked} = post
          if(isLiked){
            // Ревлизовать апи удаления Лайков
            disLike({token, id})
              .then((newPost) => {
                post.likes = newPost.post.likes;
                post.isLiked = newPost.post.isLiked;

                renderUserPostsPageComponent ({ appEl, token})
              })
            
          } else {
            // Ревлизовать апи добавления Лайков
            addLike({token, id})
              .then((newPost) => {
                post.likes = newPost.post.likes;
                post.isLiked = newPost.post.isLiked;

                renderUserPostsPageComponent ({ appEl, token})
              })
            
            
          }
        })
    })

}