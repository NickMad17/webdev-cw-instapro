import { renderHeaderComponent } from "./header-component.js";
import { renderUserPosts } from "../mini-components/render-user-posts.js";
import { userPosts } from "../index.js";

export function renderUserPostsPageComponent ({ appEl }) {
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
}