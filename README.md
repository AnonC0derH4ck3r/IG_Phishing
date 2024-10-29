# IG_Phishing

Hi folks, this is an advanced phishing page of a popular platform Instagram which can be used to steal credentials sophisticatedly. This is the same type of phishing page which cybercriminals used back in 2022 to steal the credentials of massive accounts posing as Facebook team through a **Blue Badge** phishing campaign.

# How it works? (Logic)
1. Asks the victim to enter his/her username and click on **Proceed** button.
2. When the victim clicks on **Proceed** button, then it shows the latest post of the victim's instagram account if he/she had a one. Also it shows the comments and likes on the posts.
3. The reason of showing these is to gain trust of the victim that the it is genuine instagram website. However, it is just interacting with an instagram's API which is giving us these information.
4. After that, when user sees the latest posts and click on Confirm, it shows the profile picture of the victim's instagram account, again, in order to gain more trust. Finally it disguises as a genuine instagram login page to enter the credentials, once victim enters the password it sends to the attacker's endpoint.
5. Also, after sending it shows a fake prompt and redirects to the official instagram page of the victim.

# Disclaimer
This is just for educational purpose and I won't be fucking responsible for any misuse of this code to harvest credentials.

# Demo


https://github.com/user-attachments/assets/b18f1a9d-83e2-4060-8272-4909886bf97a

