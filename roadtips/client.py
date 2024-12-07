#This file connects to the server to interact with the database

import socket
import sys
import hashlib

HOST = "localhost"  # The server's hostname or IP address
PORT = 12345  # The port used by the server


def main():
    #if user does not include message
    if len(sys.argv) <= 1:
        print ('ERROR. Message not included.')
        sys.exit(2)
    message = sys.argv[1]

    #if login attempt:
    loginCheck = slice(0,5)
    if message[loginCheck] == "LOGIN":  

        array = message.split(";", 2)

        pswd = str(array[2])
        hash = hashlib.sha256(pswd.encode())
        hashStr = hash.hexdigest()

        message ="SELECT username FROM Users WHERE username = '" + str(array[1]) + "' AND password = '" + str(hashStr) + "'"

    #if new account
    elif message[loginCheck] == "SIGNI":
        array = message.split(";", 3)

        pswd = str(array[3])
        hash = hashlib.sha256(pswd.encode())
        hashStr = hash.hexdigest()

        message ="INSERT INTO Users(username, email, password) VALUES ('" + str(array[1]) + "', '" + str(array[2]) + "', '" + str(hashStr) + "');"


    message = str(message)

    #connect to server
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((HOST, PORT))
        s.sendall(message.encode())

        #get reply
        data = s.recv(1024)

    data = data.decode('utf-8')

    print("Received: " + data)

    return data

main()