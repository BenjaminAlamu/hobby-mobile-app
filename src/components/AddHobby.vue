<template>
  <Page>

      <FlexboxLayout flexDirection="column" justifyContent="center" class="full-height">
        <StackLayout class="container">
          <FlexboxLayout alignItems="center" class="border-bottom" horizontalAlignment = "center">
            <TextField v-model="hobby" hint="Enter Hobby" class="form-input" />
          </FlexboxLayout>
          <Button text="Add Hobby" @tap="addHobby" class="my-button" />
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
      hobby: '',
      busy: false,
    }
  },
  mounted(){
    //   console.log(this.$route.query.username);
  },
  methods: {
    addHobby(){

        const self = this;
        fetch('https://hobbybackend.herokuapp.com/add',{        
            method: 'POST',
            headers: {
               "Content-Type": "application/json",
                "Authorization": "Bearer " + this.$route.query.token
            },
            body:JSON.stringify({
            userid: this.$route.query.id,
            hobby: self.hobby,
            username: this.$route.query.username,
            }),
            }).then((res) => res.json())
            .then(function(data){
                if(data.success === true){
                    TNSFancyAlert.showSuccess("Success!", "Hobby successfully added", "Close");
                    let url = '/list?id=' + self.$route.query.id + '&token=' + self.$route.query.token + '&username=' + self.$route.query.username;
                    self.$router.push(url);
                }else{
                    TNSFancyAlert.showError("Error!", "An error occured", "Close");
                }
                
            })
            .catch((err)=>console.log(err))
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

