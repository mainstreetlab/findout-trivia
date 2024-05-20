{ pkgs }: {
  deps = [
    pkgs.openssh
    pkgs.vim-full
    pkgs.ccrypt
    pkgs.curl
    pkgs.cowsay
  ];
}