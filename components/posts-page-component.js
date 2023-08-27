import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, user } from "../index.js";
import { renderPosts } from "../mini-components/render-posts.js";
import { addLike, disLike, getPosts} from "../api.js";

export function renderPostsPageComponent({ appEl, token }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
    const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                ${renderPosts()}
                </ul>
              </div>`;

   appEl.innerHTML = appHtml;


  const likes = document.querySelectorAll('.like-button');
    likes.forEach((like, index) => {
        like.addEventListener('click', (e) => {
          e.stopPropagation();
          const id =  like.dataset.postId;
          let post = posts[index];
          let {isLiked} = post
          if(isLiked){
            // Ревлизовать апи удаления Лайков
            disLike({token, id})
              .then((newPost) => {
                // renderPostsPageComponent({ appEl, token })
              })
            
          } else {
            // Ревлизовать апи добавления Лайков
            addLike({token, id})
              .then((newPost) => {
                // renderPostsPageComponent({ appEl, token })
              })
            
            
          }
        })
    })

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
