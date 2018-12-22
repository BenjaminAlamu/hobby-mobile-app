<template>
  <Page>

      <FlexboxLayout flexDirection="column" justifyContent="center" class="full-height">
        <StackLayout class="container">
          <FlexboxLayout alignItems="center" class="border-bottom" horizontalAlignment = "center">
            <TextField v-model="usernameInput" hint="Username" class="form-input" />
          </FlexboxLayout>

          <FlexboxLayout alignItems="center" class="border-bottom" horizontalAlignment = "center">
            <TextField v-model="passwordInput" hint="Password" secure="true" class="form-input" />
          </FlexboxLayout>

          <Label :text="error"/>
          <Button text="Login" @tap="onButtonTap" class="my-button" />
          <!-- <Button text="Login" @tap="$router.push('/list?id=5b2b99a8759c872be0cb5729&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOjE1Mjk1ODQwNDAwNDAsInVwZGF0ZWRBdCI6MTUyOTU4NDA0MDA0MCwiaWQiOiI1YjJiOTlhODc1OWM4NzJiZTBjYjU3MjkiLCJ1c2VybmFtZSI6IlRlc3QxIiwicGhvbmVudW1iZXIiOjgxMDMzNzQyODksImZpcnN0bmFtZSI6IkJlbmphbWluIiwibGFzdG5hbWUiOiJBbGFtdSIsImVtYWlsIjoiZnd3dUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCQucndadmFGYlkuWE9xQnIwRFJVOExPbXhzcFlpUkt1clBFOU9vTlpMQ1RwWGhwTFd2OTY2MiIsImlhdCI6MTUzNjY4NDI1M30.20-irK0ZgjrBt-1ntxfLQouVDoJ6Yn8Ro1t11jN809U&username=Test1')" class="my-button" /> -->

          <FlexboxLayout alignItems="center" justifyContent="space-between" class="auth-buttons">

            <Label horizontalAlignment="left" text="Create Account" @tap="$router.push('/register')" />
            <Label horizontalAlignment="right" text="Forgot Password" @tap="labelTap" />
          </FlexboxLayout>
          <ActivityIndicator :busy="busy" />
 
        </StackLayout>

      </FlexboxLayout>
    
  </Page>
</template>

<script>
import axios from "axios";
import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";
export default {
  data() {
    return {
      usernameInput: '',
      passwordInput: '',
      post: [],
      busy: false,
      error: ""
    }
  },
  mounted(){

  },
  methods: {
    labelTap(){
      TNSFancyAlert.showError("Error!", "Why would you forget your password, Oga create a new account or BE GONE!!!!!!", "Close");
    },
    onButtonTap(){
      this.busy = true;
      axios.post('https://hobbybackend.herokuapp.com/login', {
      username: this.usernameInput,
      password: this.passwordInput
      })
      .then(response => {
        this.busy = false;
        console.log("Here");
        if(response.data.success === true){
          console.log(response.data);
          this.busy = false;
          let url = '/list?id=' + response.data.id + '&token=' + response.data.token + '&username=' + response.data.username;
          console.log(url)
          this.$router.push(url);
        }
        else{
          console.log("Failure");
          this.busy = false;
          TNSFancyAlert.showError("Error!", response.data.message, "Close");
        } 
      }).catch(error => {

      })

    }

  }

}
</script>

<style scoped>
  .border-bottom {
    border-bottom-width: 1;
    border-bottom-color: white;
    margin-bottom: 40;
    padding-bottom: 8;
  }

  .form-input {
    color: black;
    width: 70%;
    
  }

  .icon-margin {
    margin-right: 10;
  }

  .my-button {
    background-color: #4BD5DC;
    color: white;
    font-weight: bold;
    border-radius: 25;
    padding-top: 14;
    padding-bottom: 14;
    text-transform: uppercase;
    letter-spacing: 0.1;
    margin-bottom: 20;
    width: 70%;
  }

  .auth-buttons {
    color: black[];
    font-size: 14;
    margin: 10;
  }

  .full-height {
    height: 100%;
  }

  .logo-container {
    width: 150;
    margin-bottom: 60;
  }

</style>

