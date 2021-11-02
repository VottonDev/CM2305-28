<?php include_once 'header.php'; ?>

<div style="background-image: url('images/frontpage_map.png');">
  <div class="mask d-flex align-items-center h-100 gradient-custom-3" style="padding-top: 2%; padding-bottom: 5%;">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5" style="color: black; opacity: 0.8;">Create an account</h2>

              <form action ="" method="post">

                <div class="form-outline mb-4">
                  <input type="text" name="username" placeholder="Username" id="form3Example1cg" class="form-control form-control-lg" />
                </div>

                <div class="form-outline mb-4">
                  <input type="password" name="password" placeholder="Password" id="form3Example3cg" class="form-control form-control-lg" />
                </div>

                <div class="form-outline mb-4">
                  <input type="password" name="confirm_password" placeholder="Confirm Password" id="form3Example4cg" class="form-control form-control-lg" />
                </div>

                <div class="d-flex justify-content-center">
                  <button type="submit" name="submit" class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>

                <p class="text-center text-muted mt-5 mb-0" style="font-size:18px;">Already have an account? <a href="login.php" class="fw-bold text-body"><u>Login here</u></a></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<?php include_once 'footer.php'; ?>
