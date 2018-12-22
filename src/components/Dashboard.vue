<template>
    <Page>
        <GridLayout rows="*,60">
            <ActivityIndicator :busy="busy" width = "50" height = "50" />
            <!-- <Label v-if="!hobby.length" text = "You have no hobbies, Kindly add some hobbies"/> -->
            <ScrollView row="0" orientation="horizontal" width="100%" height="100%">
                <StackLayout class="container">
                    <ListView for="item in hobbies">
                        <v-template >
                            <StackLayout class = "hobby">
                                <Label :text="item.hobby" class = "h3" />
                                <WrapLayout>
                                    <Button width="30%" text="Edit" @tap="editHobby(item.id)"  />
                                    <Button width="30%" text="Delete" @tap="deleteHobby(item.id)"  />
                                </WrapLayout>
                            </StackLayout>
                        </v-template>
                    </ListView>
                </StackLayout>
            </ScrollView>
            <StackLayout row ="1">
                <Button text="+" @tap="addHobby" class="addButton" />
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script>
import axios from 'axios'
import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";
    export default {
        data(){
            return {
                busy: true,
                hobbies:[],
            }
        },
        mounted(){
            this.listHobbies();
            console.log("Here")
        },
        methods: {
            addHobby(){
                let url ='/add?id=' + this.$route.query.id + '&token=' + this.$route.query.token + '&username=' + this.$route.query.username;
                this.$router.push(url)
            },
            editHobby(id){
                let url ='/edit?id=' + this.$route.query.id + '&token=' + this.$route.query.token + '&username=' + this.$route.query.username + '&hobbyid=' + id;
                this.$router.push(url)
            },
            deleteHobby(id){
                const self = this;
                fetch('https://hobbybackend.herokuapp.com/delete/' + id, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + this.$route.query.token
                    }})
                    .then((res) => res.json())
                    .then(function(data){
                        self.listHobbies();
                        TNSFancyAlert.showInfo("Notice!", "You deleted a hobby", "Close");
                    })
                .catch((err)=>console.log(err))
            },
            listHobbies(){
                const self = this;
                fetch('https://hobbybackend.herokuapp.com/view/' + this.$route.query.id, {        
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + this.$route.query.token
                    }
                }).then((res) => res.json())
                .then(function(data){
                    console.log("here");
                    self.hobbies = data;
                    self.busy = false;
                } )
                .catch((err)=>console.log(err))
            }

    }
    }

    
    
</script>

<style scoped>
.hobby{
    padding: 20;
}

.addButton{
    position:fixed;
    bottom: 10;
    right: 10;
    border-radius: 50%;
    background-color: green;
    width: 50;
}
</style>