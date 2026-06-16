import google.generativeai as genai

API_KEY = "AQ.Ab8RN6KQqQvQiL7VW1O0GjgarLOc3lu5O6r2gA"

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def explain_code(code_text):

    prompt = f"""
    Explain this notebook in 3 simple sentences.

    Code:

    {code_text}
    """

    response = model.generate_content(prompt)

    return response.text
