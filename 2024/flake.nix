{
  description = "AoC 2024 - Gleam Addition";

  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    nixpkgs_master.url = "github:NixOS/nixpkgs?ref=master";
  };

  outputs = inputs@{ flake-parts,  ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [];
      systems = ["aarch64-darwin"];
      perSystem = { config, self', inputs', pkgs, system, ... }:
      {
        devShells = {
          default = pkgs.mkShell {
            buildInputs = with pkgs; [gleam erlang_26 rebar3 bun];
          };
        };
        formatter = pkgs.alejandra;
      };
      flake = {};
    };
}
