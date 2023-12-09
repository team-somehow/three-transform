
from lighthouseweb3 import Lighthouse
lighthouseKeys='189af0ba.4f431b7ecc314f4ea25273a574b88111'
print(lighthouseKeys)
lh = Lighthouse(token=lighthouseKeys)
def uploadFile(address):
    upload = lh.upload(source=address)
    print(upload)

def downLoadFile():
    print(lh.download('QmPQWHcU3z2b2dFtUohN6hugs6jWWpjbR9GBnh84pr6kGt'))
    file_info = lh.download('QmPQWHcU3z2b2dFtUohN6hugs6jWWpjbR9GBnh84pr6kGt')
    file_content = file_info[0]

    with open('arya.zip', 'wb') as destination_file:
        destination_file.write(file_content)




# print(getUploadInformation())
uploadFile('./static/setup-94757/artifacts.zip')
