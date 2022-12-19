from concurrent import futures
import time

import grpc
import greet_pb2
import greet_pb2_grpc


'''
מחלקה עם כל הפעולות לצד לקוח
הפעולות שם יהיו לפי מה שנכתב בפרוטו
כל פעולה פה מחזירה הודעה ומקבלת בקשה המהלקוח
'''
class GreeterServicer(greet_pb2_grpc.GreeterServicer):
    '''
    פעולה פשוטה, שולחת הודעה למחשב והמחשב מחזיר הודעה
    '''
    def Unary(self, request, context):
        print("SayHello Request Made:")
        print(request)
        hello_reply = greet_pb2.HelloReply()
        hello_reply.message = f"{request.greeting} {request.name}"

        return hello_reply
    
    '''
    פעולה שעד שהשרת לא מסיים את הריצה שלו, הלקוח ימשיך לרוץ
    '''
    def ServerStreaming(self, request, context):
        print("ParrotSaysHello Request Made:")
        print(request)

        for i in range(3):
            hello_reply = greet_pb2.HelloReply()
            hello_reply.message = f"{request.greeting} {request.name} {i + 1}"
            yield hello_reply
            time.sleep(3)

    #אין דגמאות לפעולות למטה, רצוי להוסיף להבא

    '''
    פעולה שעד שהלקוח לא מסיים את הריצה שלו, השרת ימשיך לרוץ
    '''
    def ClientStreaming(self, request_iterator, context):
        delayed_reply = greet_pb2.DelayedReply()
        for request in request_iterator:
            print("ChattyClientSaysHello Request Made:")
            print(request)
            delayed_reply.request.append(request)

        delayed_reply.message = f"You have sent {len(delayed_reply.request)} messages. Please expect a delayed response."
        return delayed_reply


    '''
    עושה פינג פונג בין השרת ללקוח
    '''
    def BothStreaming(self, request_iterator, context):
        for request in request_iterator:
            print("InteractingHello Request Made:")
            print(request)

            hello_reply = greet_pb2.HelloReply()
            hello_reply.message = f"{request.greeting} {request.name}"

            yield hello_reply

'''
מתחבר לשרת, אין יותר מדי מה להוסיף
'''
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    greet_pb2_grpc.add_GreeterServicer_to_server(GreeterServicer(), server)
    print('Server Started. Listening on port 9090')
    server.add_insecure_port('[::]:9090')
    server.start()
    server.wait_for_termination()

if __name__ == "__main__":
    serve()