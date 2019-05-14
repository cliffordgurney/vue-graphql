<template>
  <v-container>
    <h1>Home</h1>
    <div v-if="$apollo.loading">Loading...</div>
    <ul v-else v-for="post in getPosts" :key="post._id">
      <li>
        {{ post.title}}
        {{ post.description}}
      </li>
    </ul>
  </v-container>
</template>

<script>
import {gql} from 'apollo-boost'
export default {
  name: "home",
  data() {
    return {
      posts: []
    }
  },
  apollo: {
    getPosts: {
      query: gql`
        query {
          getPosts {
            _id
            title
            description
          }
        }
      `,
      result({data, loading}) {
        if(!loading){
          this.posts = data.getPosts
        }
      }
    }
  }
};
</script>
