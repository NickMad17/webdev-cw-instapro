import { renderUploadImageComponent } from "./upload-image-component.js";
import { renderHeaderComponent } from "./header-component.js";
import { censured } from "../mini-components/censured.js";


export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";

  const render = () => {
    const appHtml = `
    <div class="page-container">
    <div class="header-container">  
    </div>
      <div class="form">
        <h3 class="form-title">Добавить пост</h3>
        <div class="form-inputs">
          <div class="upload-image-container">
  <div class="upload-image">
      
  </div>
</div>
          <label>
            Опишите фотографию:
            <textarea class="input textarea" id="textInput" rows="4"></textarea>
            </label>
            <button class="button" id="add-button">Добавить</button>
        </div>
      </div>
    </div>
  `;
  
    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });
    
    const uploadImageContainer = appEl.querySelector(".upload-image");

    if(uploadImageContainer){
      renderUploadImageComponent({
        element: appEl.querySelector('.upload-image'),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      })
    }

    document.getElementById("add-button").addEventListener("click", () => {
      const textInput = document.getElementById('textInput');
      const text = censured(textInput.value)
      ;

      if (imageUrl && text){
        onAddPostClick({
          description: text,
          imageUrl: imageUrl,
          
        });
      } 
      if(!text && !imageUrl){
        alert('Не указанно фото и описание');
        render();
      }
      if (!text && imageUrl){
        alert('Не заполнено описание фото');
        render();
      } 
      if(text && !imageUrl){
        alert('Не указанно фото');
        render();
      }
    });
  };
  render();
}
