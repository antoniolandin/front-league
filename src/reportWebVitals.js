const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry); //Cumulative Layout Shift
      getFID(onPerfEntry); //First Contentful Painting
      getFCP(onPerfEntry); //First Input Delay
      getLCP(onPerfEntry); //Large Contentx Painting
      getTTFB(onPerfEntry); //Time to First Byte
    });
  }
};

export default reportWebVitals;
