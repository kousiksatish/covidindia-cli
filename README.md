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
# Display data for all states.
covidindia-cli
```

### Single State

```sh
# Display data for given state.
covidindia-cli <stateNameOrCode>

# Display data for given state i.e. Karnataka
covidindia-cli ka
# or
covidindia-cli karnataka

# Display data for given state i.e. Maharashtra
covidindia-cli mh
# or
covidindia-cli maharashtra
```

### Single State with district level details

```sh
# Display district level data for given state.
covidindia-cli <stateNameOrCode> --district
# or
covidindia-cli <stateNameOrCode> -d

# Display district level data for given state i.e. Karnataka
covidindia-cli ka --district
# or
covidindia-cli ka -d

# Display district level data for given state i.e. Maharashtra
covidindia-cli mh --district
# or
covidindia-cli mh -d
```

Please note that you can also execute the above cli with just ```covidindia``` instead of ```covidindia-cli```

## Notes

Data is fetched from https://api.covid19india.org

Inspired by https://github.com/ahmadawais/corona-cli

[npm-url]: https://www.npmjs.com/package/covidindia-cli
[npm-image]: https://img.shields.io/npm/v/covidindia-cli.svg
[download-image]: https://img.shields.io/npm/dt/covidindia-cli