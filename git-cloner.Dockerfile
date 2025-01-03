FROM debian:bullseye-slim

RUN apt-get update && apt-get install -y \
  git \
  && git --version \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# CMD git clone https://zach-schrag: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@github.com/zach-schrag/booth-assignment.git . && ls -l
