<template>
  <div>
    BookMarks
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Catalog.BookMarks',
  computed: {
    ...mapState({
      isLoadingBookMarks: state => state.catalog.isLoadingBookMarks,
      loadingBookMarksFail: state => state.catalog.loadingBookMarksFail,
      bookMarks: state => state.catalog.bookMarks
    })
  }
}
</script>

<style lang="less" scoped>

</style>
