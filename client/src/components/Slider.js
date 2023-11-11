import React from "react";
import "./SliderStyle.css";

const Slider = () => {
  return (
    <div id="carouselExampleCaptions" class="carousel slide">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="https://roadtodivinity.files.wordpress.com/2017/01/swami-vivekananda-wallpaper.png"
            class="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>SVBH Hostel</h5>
            <p>Sardar vivekanand boys Hostel</p>

            <div class="slider-btn">
              <button class="btn btn-1">
                <a href="">Register</a>
              </button>
              <button class="btn btn-1">
                <a href="">login</a>
              </button>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="https://e1.pxfuel.com/desktop-wallpaper/107/678/desktop-wallpaper-bal-gangadhar-tilak-tilak.jpg"
            class="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>Tilak Hostel</h5>
            <p>Bal gangadhar tilak Hostel</p>

            <div class="slider-btn">
              <button class="btn btn-1">
                <a href="">Register</a>
              </button>
              <button class="btn btn-2">
                <a href="">login</a>
              </button>
            </div>
          </div>
        </div>
        {/* <div class="carousel-item">
          <img
            src="./about-Statue-of-Unity.jpg"
            class="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>Patel Hostel</h5>
            <p></p>

            <div class="slider-btn">
              <button class="btn btn-1">
                <a href="">Register</a>
              </button>
              <button class="btn btn-1">
                <a href="">login</a>
              </button>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="./6d7c2a75acd5c480dde7ab60a1c9cb86.jpg"
            class="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>Malviya Hostel</h5>
            <p>Some representative placeholder content for the third slide.</p>

            <div class="slider-btn">
              <button class="btn btn-1">
                <a href="">Register</a>
              </button>
              <button class="btn btn-1">
                <a href="">login</a>
              </button>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="./london-3440063_960_720-1-1.jpg"
            class="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>Diamond jublee Hostel</h5>
            <p>Some representative placeholder content for the third slide.</p>

            <div class="slider-btn">
              <button class="btn btn-1">
                <a href="">Register</a>
              </button>
              <button class="btn btn-1">
                <a href="">login</a>
              </button>
            </div>
          </div>
        </div>*/}
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
