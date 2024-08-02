export default {
  randomDefaultBanner: () => {
    const defaultBanners = [
      "banners/pic01.jpg",
      "banners/pic02.jpg",
      "banners/pic03.jpg",
      "banners/pic04.jpg",
      "banners/pic05.jpg",
      "banners/pic06.jpg",
      "banners/pic07.jpg",
      "banners/pic08.jpg",
      "banners/pic09.jpg",
      "banners/pic10.jpg",
      "banners/pic11.jpg",
      "banners/pic12.jpg",
      // "banners/pic13.jpg",
      "banners/pic14.jpg",
      "banners/pic15.jpg",
    ];
    const randomIndex = Math.floor(Math.random() * defaultBanners.length);
    return defaultBanners[randomIndex];
  },

  randomBannerStyle: () => {
    const styles = ["style1", "style2", "style3", "style4", "style5", "style6"];

    const i = Math.floor(Math.random() * styles.length);
    return styles[i];
  },
};
