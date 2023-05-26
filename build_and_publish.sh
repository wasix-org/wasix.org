#!/bin/bash

pnpm run build
cd wasix-docs
wasmer-deploy publish