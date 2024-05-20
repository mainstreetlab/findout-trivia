{ pkgs }: {
  deps = [
    pkgs.git-filter-repo
    pkgs.openssh
    pkgs.vim-full
    pkgs.ccrypt
    pkgs.curl
    pkgs.cowsay
  ];
}