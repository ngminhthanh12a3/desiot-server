CC = gcc # Compiler to use
INCLUDES = -I ./ # Directory for header file
OBJS = chacha_merged.o chacha20poly1305.o \
		main.o \
		poly1305-donna.o \
		rfc7539.o# List of objects to be build

all: ${OBJS}
	@echo "Building..."             # To print "Building.." message
	${CC} ${OPTIONS} ${INCLUDES} ${OBJS} -o Binary

%.o: %.c                             # % pattern wildcard matching
	${CC} ${OPTIONS} -c $*.c ${INCLUDES}

list:
	@echo $(shell ls)               # To print output of command 'ls'

clean:
	@echo "Cleaning..."
	rm -rf *.o
	rm -f Binary