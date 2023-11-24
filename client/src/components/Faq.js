import React from "react";

const Faq = () => {
  return (
    <div>
      <section class=" py-3 py-md-5 py-xl-8">
        <div class="container">
          <div class="row gy-5 gy-lg-0 align-items-lg-center">
            <div class="col-12 col-lg-6">
              <img
                class="img-fluid rounded"
                loading="lazy"
                src="https://assets-global.website-files.com/5e78f62c08f1bb8c2d788576/6386109f6528fe6ecbe7c97a_a8zkm6bdfzbtq4w4zf6bt52tj50u1q1b.png"
                alt=""
                style={{ height: "621px" }}
              />
            </div>
            <div class="col-12 col-lg-6">
              <div class="row justify-content-xl-end">
                <div class="col-12 col-xl-11">
                  <h2 class="h1 mb-3">How can we help you?</h2>
                  <p class="lead fs-4 text-secondary mb-5">
                    We hope you have found an answer to your question. If you
                    need any help, please search your query on our Support
                    Center .
                  </p>
                  <div class="accordion accordion-flush" id="accordionExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingOne">
                        <button
                          class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          How to contact us ?
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        class="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          You can contact us via email or phone number given on website.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingTwo">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          How to create an accont ?
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                       You can create an account by registering at our website by your registration number ,name ,email , designation, hostel etc.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingThree">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          How to file a complaint?
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          Go to main page-> hover to side bar-> click on add complaint -> fill the form and then click on submit.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
