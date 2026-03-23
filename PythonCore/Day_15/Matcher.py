# it uses Python's built-in re (regular expression) library 
# and set operations to find the oerlapping or common keywords/charater/elements.

import re

def clean_text(text):
    """Cleans text by lowering case, removing punctuation, and dropping stop words."""
    # Convert to lowercase
    text = text.lower()

    # Remove punctuation using regular expressions
    text = re.sub(r'[^\w\s]', '', text)

    # Split the text into a Swt of unique words
    words = set(text.split())

    # A lightweight list of common words we don't care about matching
    stop_words = {"and", "the", "to", "a", "of", "for", "in", "with", "on", "is", "an", "as", "we", "are", "looking", "experience", "or", "a"}

    # Subtract the stop words from our unique words
    return words - stop_words


def calculate_match(resume_text, jd_text):
    """Compares the resume against the job description and returns a score"""
    resume_keywords = clean_text(resume_text)
    jd_keywords = clean_text(jd_text)

    # The intersection finds words that exist in BOTH sets
    matched_keywords = resume_keywords.intersection(jd_keywords)

    # Missing keywords are those in the job description, but not in the Resume
    missing_keywords = jd_keywords - resume_keywords

    # Calculate the percentage of JD keywords found in the resume
    if not jd_keywords:
        return 0.0, set(), set()
    
    match_percentage = (len(matched_keywords) / len(jd_keywords)) * 100

    return round(match_percentage, 2), matched_keywords, missing_keywords

# --- Running the CLI Tool ---
if __name__ == "__main__":
    print("--- ATS Resume Keyword Matcher ---\n")

    # You can easily change these strings to test different jobs
    sample_jd = """ We are looking for a backend developer.
                    Required skills: Python, Sql, REST APIs.
                    Experience with Django is a plus. Must know Git. """
    
    sample_resume = """ Software developer with a string background in backend tech.
                        I write clean Python and SQL code. I have built projects using Django. """
    
    score, matches, missing = calculate_match(sample_resume, sample_jd)

    print(f"Match Score: {score}%")
    print(f"Keywords Found: {', '.join(matches)}")
    print(f"Keywords Missing: {', '.join(missing)}")