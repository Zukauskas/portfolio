const withMDX = require('@next/mdx')();
const path = require('path'); // Ensure path is imported

/** @type {import('next').NextConfig} */
let nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  webpack: (config, options) => { // options contains isServer
    // Store the original webpack function if it exists from withMDX
    const originalWebpack = config.webpack;
    
    // Our custom webpack modifications
    // Remove any pre-existing general .md raw-loader rule to avoid conflicts
    // This assumes the original config.module.rules might have such a rule.
    // It's safer to filter out any rule that might conflict.
    if (config.module && config.module.rules) {
        config.module.rules = config.module.rules.filter(rule => {
            // Keep rule if it's not a generic .md raw-loader rule
            const isGenericMdRawLoader = rule.test && rule.test.toString() === /\.md$/.toString() && rule.use === 'raw-loader' && !rule.include;
            return !isGenericMdRawLoader;
        });
    }


    // Add the specific rule for .md files in app/content/
    config.module.rules.push({
      test: /\.md$/,
      include: [
        path.resolve(__dirname, 'app/content') // Use the imported 'path'
      ],
      use: 'raw-loader',
    });

    // If withMDX provided its own webpack function, call it.
    // However, withMDX typically modifies the config object directly or expects its webpack
    // function to be called by Next.js. The HOC pattern means it wraps the config.
    // The rules from withMDX are usually already in `config.module.rules`.
    // What's important is that our rule is specific enough (due to `include`)
    // that it should be picked for app/content/*.md before a more general MDX rule.

    return config;
  },
};

// Apply the withMDX HOC to our nextConfig
module.exports = withMDX(nextConfig);