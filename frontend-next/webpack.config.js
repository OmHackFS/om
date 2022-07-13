module.exports = {
  //...
  experiments: {
    asyncWebAssembly: true,
  },
  module: {
    rules: [
      {
        test: /\.(txt|glsl|vert|frag)/,
        //add this exclude
        exclude: [/node_modules/],
      },
    ],
  },
};
