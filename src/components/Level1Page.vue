<template>
    <div class="container mt-5 mb-5">
      <h2 class="d-flex justify-content-start mb-4">Users List</h2>
      <div class="row row-cols-1 row-cols-lg-2 g-2 g-lg-2">
        <!-- looping all users data -->
        <div class="col" v-for="user in users" :key="user.id">
          <div class="card-user" >
              <div class="card-body">
                  <b-card
                    img-src="https://picsum.photos/600/300/?image=349"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 40rem;"
                    class="mb-2"
                  >
                    <b-card-text>
                      <h6 class="card-title me-2">Name : {{user.name}} </h6>
                      <h6 class="card-title me-2">Username : {{user.username}} </h6>
                      <h6 class="card-title me-2">Email : {{user.email}} </h6>
                      <h6 class="card-title me-2">Address : {{user.address.street}}, {{user.address.suite}}, {{user.address.city}}</h6>
                      <h6 class="card-title me-2">Phone : {{user.phone}}</h6>
                      <h6 class="card-title me-2">Website : {{user.website}} </h6>
                      <h6 class="card-title me-2">Company : {{user.company.name}} </h6>
                    </b-card-text>
                    <b-button variant="primary" @click="userDetail(user.id, user.name)">See Detail user</b-button>
                  </b-card>
              </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";

  export default {
    name: 'Level1Page',
    data: () => ({
      users:[]
    }),
    mounted(){
      this.getAllUsers();
    },
    methods: {
      getAllUsers(){
        const USERS_API = 'https://jsonplaceholder.typicode.com/users';
        axios.get(USERS_API)
        .then (response => this.users = response.data)
      },
      userDetail(userId, userName){
        localStorage.setItem('userName', userName)
        this.$router.push({name: 'Level2Page', params: {userId: userId}});
      }
    }
  }
  </script>
  
  <style>
 
  </style>
  