<template>
  <div class=" col-12 form-signin container justify-content-center align-content-center ">
    <AuthSidebar currentTab="general"/>
    <hr>
    <h1 class="title text-center">{{ $t("login.login") }}</h1>
    <div class="wrapper">
      <div class="form-group mt-4">
        <label class="label" for="email">{{ $t("login.mail") }}:</label>
        <input v-model="email" type="email" :class="'form-control ' + formErrors.email" id="email" name="email"
               placeholder="name@example.com">
      </div>
      <div class="form-group mt-4">
        <label class="label" for="password">{{ $t("login.password") }}:</label>
        <input v-model="password" type="password" :class="'form-control ' + formErrors.password" id="password"
               name="password" :placeholder="$t(`login.password`)">
      </div>
      <div class="form-group1 text-center mt-4">
        <button @click=login class="btn" type="submit" :disabled="active">{{ $t("login.login") }}</button>
      </div>
      <div class="form-group1 text-center mt-4">
        <h5>{{ $t("login.don`t_have_account") }}</h5>
        <h6><a href="/register" class="text-decoration-none">{{ $t("login.create_account") }}</a></h6>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from "@/api";
import AuthSidebar from "@/components/auth/AuthSidebar";


export default {
  name: "LoginComponent",
  components: {AuthSidebar},
  AuthSidebar,

  data: () => ({
    email: "",
    password: "",
    formErrors: {
      email: 'is-invalid',
      password: 'is-invalid'
    },
    active: 'true'
  }),
  updated() {
    let errors = Object.values(this.formErrors);
    this.active = errors.includes("is-invalid")
  },
  methods: {
    login() {
      login({
        'email': this.email,
        'password': this.password,
      })
          .then(response => {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('authTokenDate', new Date().toISOString());
            //localStorage.setItem('role', response.data.user.role);
            this.$router.push('/analytics/general');
          })
          .catch(e => {
            console.log(e)
          })
    }
  },
  watch: {
    email() {
      this.formErrors.email = "is-valid";
      if (!(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(this.email))) {
        this.formErrors.email = "is-invalid";
      }
    },
    password() {
      this.formErrors.password = "is-valid";
      if ((this.password.length < 5) || !(/[a-zA-Z0-9]/.test(this.password))) {
        this.formErrors.password = "is-invalid";
      }
    },
  },
}
</script>

<style scoped>
.wrapper {
  background: #FFFFFF;
  width: 600px;
  height: 400px;
  padding: 20px;
  margin: 0 auto;
  margin-top: 150px;
  border: 1px solid #808191;
  box-shadow: 0px 22px 29px rgba(0, 0, 0, 0.05);
  border-radius: 50px;
}

.title {
  font-style: normal;
  font-weight: 700;
  font-size: 33px;
  line-height: 91px;
  position: relative;
  top: 150px;
  letter-spacing: 4px;
  font-family: 'Martel Sans', sans-serif;
  color: #11142D;
}


.form-group input{
  width: 400px;
  background-color: #F2F6FC;
  margin: 0 auto;
  font-family: 'Martel Sans', sans-serif;
  font-size: 24px;
  border-radius: 15px;
  letter-spacing: 2px;

}

.label{
  font-size: 22px;
  position: relative;
  letter-spacing: 2px;
  left: 83px;
  font-family: 'Martel Sans', sans-serif;

}

.btn{
  background-color: #0052CC;
  font-family: 'Martel Sans', sans-serif;
  width: 159px;
  letter-spacing: 3px;
  color:white;
  font-size: 20px;
  border-radius: 20px;
}
h5{
  font-family: 'Martel Sans', sans-serif;
  letter-spacing: 3px;
}
h6 a{
  color: black;
  text-decoration: underline;;
}
hr{
  transform: rotate(90deg);
  position: relative;
  left: -650px;
  margin-top: 0;
}
</style>