import React, { useState } from "react";
import '../../styles/ResultsCard/index.css'
import { RESULTS } from "../../data/results";
import { FaDownload } from "react-icons/fa"; // Importa el ícono de descarga

// Filtra los resultados del año 2024
const results2024 = RESULTS.filter(result => result.year === '2024');

const Results2 = () => {
  const [selectedCard, setSelectedCard] = useState(results2024[0]?.title); // Inicializa con la primera tarjeta abierta

  const handleCardClick = (title) => {
    setSelectedCard(title);
  };

  return (
    <section className="overflow-hidden w-full h-auto flex items-center justify-center o">
      <div className="results-container h-full my-20 ">
   
      <input type="radio" name="slider" id="s1" checked />
      <input type="radio" name="slider" id="s2" />
      <input type="radio" name="slider" id="s3" />
      <input type="radio" name="slider" id="s4" />
      <input type="radio" name="slider" id="s5" />

      <div className="results-cards" id="slide1">
        <label htmlFor="s1" id="slide1">
          <div className="results-card">
            <div className="results-card-image">
              <img src="https://plus.unsplash.com/premium_photo-1718198497330-08b58f749d4b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8" alt="Nike superrep go" />
              <div className="results-card-dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="results-card-infos">
              <span className="results-card-name">Nike superrep go</span>
              <span className="results-card-lorem">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime quisquam, excepturi quod neque saepe voluptas placeat nihil deleniti consectetur officiis molestias quae laboriosam, enim atque tempore repellat. Ab, sint officiis!
              </span>
              <a href="" className="results-card-btn-details">Details</a>
              <div className="results-card-actions">
                <i className="fa-solid fa-card-shopping"></i>
                <i className="fa-regular fa-heart"></i>
                <i className="fa-regular fa-heart"></i>
                <i className="fa-regular fa-heart"></i>
              </div>
            </div>
          </div>
        </label>

        <label htmlFor="s2" id="slide2">
          <div className="results-card">
            <div className="results-card-image">
              <img src="https://images.unsplash.com/photo-1721332154373-17e78d19b4a4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" alt="Nike superrep go" />
              <div className="results-card-dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="results-card-infos">
              <span className="results-card-name">Nike superrep go</span>
              <span className="results-card-lorem">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime quisquam, excepturi quod neque saepe voluptas placeat nihil deleniti consectetur officiis molestias quae laboriosam, enim atque tempore repellat. Ab, sint officiis!
              </span>
              <a href="" className="results-card-btn-details">Details</a>
              <div className="results-card-actions">
                <i className="fa-solid fa-card-shopping"></i>
                <i className="fa-regular fa-heart"></i>
                <i className="fa-regular fa-heart"></i>
                <i className="fa-regular fa-heart"></i>
              </div>
            </div>
          </div>
        </label>

        <label htmlFor="s3" id="slide3">
          <div className="results-card">
            <div className="results-card-image">
              <img src="https://images.unsplash.com/photo-1723675747885-84f60ccc4db8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8" alt="Nike superrep go" />
              <div className="results-card-dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="results-card-infos">
              <span className="results-card-name">Nike superrep go</span>
              <span className="results-card-lorem">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime quisquam, excepturi quod neque saepe voluptas placeat nihil deleniti consectetur officiis molestias quae laboriosam, enim atque tempore repellat. Ab, sint officiis!
              </span>
              <a href="" className="results-card-btn-details">Details</a>
              <div className="results-card-actions">
                <i className="fa-solid fa-card-shopping"></i>
                <i className="fa-regular fa-heart"></i>
                <i className="fa-regular fa-heart"></i>
                <i className="fa-regular fa-heart"></i>
              </div>
            </div>
          </div>
        </label>

        <label htmlFor="s4" id="slide4">
          <div className="results-card">
            <div className="results-card-image">
              <img src="https://images.unsplash.com/photo-1723466394553-f52d59876483?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8" alt="Nike superrep go" />
              <div className="results-card-dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="results-card-infos">
              <span className="results-card-name">Nike superrep go</span>
              <span className="results-card-lorem">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime quisquam, excepturi quod neque saepe voluptas placeat nihil deleniti consectetur officiis molestias quae laboriosam, enim atque tempore repellat. Ab, sint officiis!
              </span>
              <a href="" className="results-card-btn-details">Details</a>
              <div className="results-card-actions">
                <i className="fa-solid fa-card-shopping"></i>
                <i className="fa-regular fa-heart"></i>
                <i className="fa-regular fa-heart"></i>
                <i className="fa-regular fa-heart"></i>
              </div>
            </div>
          </div>
        </label>

        <label htmlFor="s5" id="slide5">
          <div className="results-card">
            <div className="results-card-image">
              <img src="https://images.unsplash.com/photo-1723642019190-b44549d0ed21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8" alt="Nike superrep go" />
              <div className="results-card-dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="results-card-infos">
              <span className="results-card-name">Nike superrep go</span>
              <span className="results-card-lorem">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime quisquam, excepturi quod neque saepe voluptas placeat nihil deleniti consectetur officiis molestias quae laboriosam, enim atque tempore repellat. Ab, sint officiis!
              </span>
              <a href="" className="results-card-btn-details">Details</a>
              <div className="results-card-actions">
                <i className="fa-solid fa-card-shopping"></i>
                <i className="fa-regular fa-heart"></i>
                <i className="fa-regular fa-heart"></i>
                <i className="fa-regular fa-heart"></i>
              </div>
            </div>
          </div>
        </label>
      </div>
      </div>
    </section>
  );
};

export default Results2;
