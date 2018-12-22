<template>
  <Page>

      <ScrollView flexDirection="column" justifyContent="center" class="full-height">
        <StackLayout class="container">
          <FlexboxLayout alignItems="center" class="border-bottom" horizontalAlignment = "center">
            <TextField v-model="firstname" hint="Firstname" class="form-input" />
          </FlexboxLayout>

          <FlexboxLayout alignItems="center" class="border-bottom" horizontalAlignment = "center">
            <TextField v-model="lastname" hint="Lastname" class="form-input" />
          </FlexboxLayout>

          <FlexboxLayout alignItems="center" class="border-bottom" horizontalAlignment = "center">
            <TextField v-model="username" hint="Username" class="form-input" />
          </FlexboxLayout>

          <FlexboxLayout alignItems="center" class="border-bottom" horizontalAlignment = "center">
            <TextField v-model="phonenumber" hint="Phone Number" class="form-input" />
          </FlexboxLayout>

          <FlexboxLayout alignItems="center" class="border-bottom" horizontalAlignment = "center">
            <TextField v-model="email" hint="Email" class="form-input" />
          </FlexboxLayout>

          <FlexboxLayout alignItems="center" class="border-bottom" horizontalAlignment = "center">
            <TextField v-model="passwordInput" hint="Password" secure="true" class="form-input" />
          </FlexboxLayout>

          <Label :text="error"/>
          <Button text="Register" @tap="register" class="my-button" />
          

          <FlexboxLayout alignItems="center" justifyContent="space-between" class="auth-buttons">

            <Label horizontalAlignment="left" text="Create Account" @tap="$router.push('/register')" />
            <Label horizontalAlignment="right" text="Forgot Password" @tap="labelTap" />
          </FlexboxLayout>
          <ActivityIndicator :busy="busy" />
 
        </StackLayout>

      </ScrollView>
    
  </Page>
</template>

<script>
import axios from "axios";
import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      phonenumber: '',
      busy: false,
    }
  },
  mounted(){

  },
  methods: {
    register(){
      this.busy = true;
      axios.post('https://hobbybackend.herokuapp.com/register', {
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.uusernamesernameInput,
      email: this.email,
      phonenumber: this.phonenumber,
      })
      .then(response => {
        this.busy = false;
        console.log("Here");
        if(response.data.success === true){
          console.log("success");
          this.busy = false;
          TNSFancyAlert.showSuccess("Success!", "Registration Completed\nPlease log in", "Ok");
          this.$router.push('/login');
        }
        else{
          console.log("Failure");
          this.busy = false;
          TNSFancyAlert.showError("Error!", response.data.message, "Close");
        } 
      }).catch(error => {
            TNSFancyAlert.showError("Error!", error.message, "Close");
      })

    }

  }

}
</script>

<style scoped>
  .border-bottom {
    border-bottom-width: 1;
    border-bottom-color: white;
    margin-top: 10;
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

