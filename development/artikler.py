#! /usr/bin/env python

import thread
import time
 
 
try:
  from msvcrt import getch
except ImportError:
  def getch():
    import sys, tty, termios
    fd = sys.stdin.fileno()
    old_settings = termios.tcgetattr(fd)
    try:
      tty.setraw(sys.stdin.fileno())
      ch = sys.stdin.read(1)
    finally:
      termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)
    return ch

def getAllowedChar():
  key = getch()
  while not key in [',', '.', '-', 'l', 'z', 'x']: 
    key = getch()
  return key

def main():

  infile = open('wortliste1.txt')

  lines = [line.strip() for line in infile]
  #print lines

  index = 0
  while len(str.split(lines[index])) > 1:
    index = index +1

  while index < len(lines):
    article = ''
    word = ''
    
    splitLine = str.split(lines[index])
    
    if (len(splitLine) > 1):
      article = splitLine[0]
      word = splitLine[1]
    else:
      word = splitLine[0]
      
    print index, article, word, '->',
    
    key = getAllowedChar()
    if key == 'x':
      break
    if key == 'z':
      if index != 0:
        index = index - 1
      print      
      continue
    if key == ',':
        article = 'der'
    if key == '.':
        article = 'das'
    if key == '-':
        article = 'die'
    if key == 'l':
      	article = '[X]'
      
    lines[index] = article + ' ' + word
    print lines[index]
    
    index = index + 1
    
  infile.close()
  outfile = open('wortliste1.txt', 'w')
  for line in lines:
    outfile.write("%s\n" % line)
  outfile.close()
  
if __name__ == "__main__":
  main()
