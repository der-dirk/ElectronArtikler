#! /usr/bin/env python

def main():

  infile = open('artikelliste.txt')

  lines = [line.strip() for line in infile]
  #print lines

  print "["

  index = 0
  while index < len(lines):
    article = ''
    word = ''
    
    splitLine = str.split(lines[index])
    
    if (len(splitLine) > 1):
      article = splitLine[0]
      word = splitLine[1]
      
      if (article == "der"):
        wrong = '"die", "das"'
      if (article == "die"):
        wrong = '"der", "das"'
      if (article == "das"):
        wrong = '"die", "der"'
        
      print '{'
      print '  "expression": "% ' + word + '",'
      print '  "matches": ["' + article + '"],'
      print '  "candidates": [' + wrong + ']'
      
      if (index == len(lines)-1):
        print '}'
      else:  
        print '},'
        
    index = index + 1
  
  print "]"

  infile.close()
  
if __name__ == "__main__":
  main()
