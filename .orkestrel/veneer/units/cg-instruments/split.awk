/^```/ { fence = !fence; next }
fence { next }
{ n = gsub(/`/, "`"); if (n % 2 == 1) print FILENAME ":" FNR ": " $0 }
