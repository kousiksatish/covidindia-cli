# covidindia-cli
[![NPM version][npm-image]][npm-url]
[![Downloads][download-image]][npm-url]

Get real time access to Covid-19 stats for Indian states on your terminal

## Install

```sh
# Install globally (recommended).
npm install -g covidindia-cli

# Or run directly with npx (installs CLI on every run).
npx covidindia-cli
```

## Usage

### All States

```sh
# Display data for all countries.
covidindia-cli
```

### Single State

```sh
# Display data for given country.
covidindia-cli <countryName>

# Display data for given state i.e. Karnataka.
covidindia-cli ka
# or
covidindia-cli karnataka

# Display data for given state i.e. Tamil Nadu.
covidindia-cli mh
# or
covidindia-cli maharashtra
```

## Notes

Data is fetched from https://api.covid19india.org

Inspired by https://github.com/ahmadawais/corona-cli

[npm-url]: https://www.npmjs.com/package/covidindia-cli
[npm-image]: https://img.shields.io/npm/v/covidindia-cli.svg
[download-image]: https://img.shields.io/npm/dt/covidindia-cli