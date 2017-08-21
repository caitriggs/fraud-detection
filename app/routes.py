from flask import Flask, request, render_template
from werkzeug import secure_filename
 
app = Flask(__name__)      
 
@app.route('/')
def home():
  return render_template('main.html')

@app.route('/upload', methods=['GET','POST'])
def upload_file():
  if request.method == 'POST':
    # The uploaded file itself
    f = request.files['fraudFile']

    # Contents of the file as a string
    file_contents = f.read()

    return file_contents
 
if __name__ == '__main__':
  app.run(debug=True)