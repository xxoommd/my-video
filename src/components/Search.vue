<template>
  <div class="search-container">
    <input type="text" name="search" id="search" placeholder="搜索" />
    <!-- <button class="clear-btn" id="clearBtn">&times;</button>
    <button type="button" class="primary">搜索</button> -->

    <button class="clear-btn">
      <span class="symbol"><img src="../assets/images/xmark.svg" alt="" /></span>
    </button>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 1.5em;
}

.search-container .clear-btn {
  width: 2em;
  height: 2em;

  /* position: absolute;
  right: 10px;
  /* 调整按钮的位置 */
  /* top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #999;
  display: none; */
  /* 默认隐藏按钮 */
}

.search-container button {
  width: 15%;
  /* font-size: ; */
  cursor: pointer;
}
</style>