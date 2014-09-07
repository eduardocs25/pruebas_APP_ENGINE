
import webapp2
import os
import jinja2

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

template = JINJA_ENVIRONMENT.get_template('/templates/home.html')
class MainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/html'
        self.response.out.write(template.render())

app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=False)
