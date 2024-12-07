#This file goes in the server's system

from socket import *
import sys
import sqlite3 

def main():
    #connect to sql server
    conn = sqlite3.connect('sql.db')

    #define cursor
    cursor = conn.cursor

    #if user does not include what port to use
    if len(sys.argv) <= 1:
        print ('Usage : "./server.py server_ip"\n[server_ip : It is the IP Address sof the server')
        sys.exit(2)

    # Create a server socket, bind it to a port and start listening
    tcpSerSock = socket(AF_INET, SOCK_STREAM)

    #define host and port
    HOST = 'localhost'
    PORT = int(sys.argv[1])

    #open server connection
    tcpSerSock.bind((HOST, PORT))
    tcpSerSock.listen()

    # Fill in end.

    while 1:

        # Start recieving data from the client
        print ('Ready to serve...')

        #recieve the connection
        tcpCliSock, addr = tcpSerSock.accept()
        print ('Received a connection from:', addr)
        
        #get the sent message
        message = tcpCliSock.recv(1024)

        #turn the message from byte to string
        message = message.decode('utf-8')

        print(message)
        
        try:

            #get the instruction
            instr = slice(0,6)
            instruction = message[instr]

            #get table data/login attempt
            if instruction == "SELECT":
                cursor = conn.cursor()
                cursor.execute(message)
                reply = cursor.fetchall()
                reply = str(reply)
                reply = reply.encode()
            
            #edit table (INSERT, ALTER TABLE, DELETE)
            else:
                conn.execute(message)
                conn.commit()
                reply = (b"success")

            
        except sqlite3.Error as err:
            reply = "ERROR. " + str(err.sqlite_errorcode) + ": " + str(err.sqlite_errorname)
            reply = reply.encode()

        #print("message: " + str(reply))
        tcpCliSock.send(reply)

main()